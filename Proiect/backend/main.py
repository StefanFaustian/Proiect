from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import bcrypt
import oracledb
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()
ORACLE_USER = os.getenv("DB_USER")
ORACLE_PASSWORD = os.getenv("DB_PASSWORD")
ORACLE_DSN = os.getenv("DB_DSN")

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Scrisoare(BaseModel):
    nume: str
    mail: str
    varsta: int
    mesaj: str

@app.post("/trimite-scrisoare")
def trimite_scrisoare(scrisoare: Scrisoare): 
    try:
        msg = MIMEMultipart()
        msg['From'] = f"Alabaster Snowball <{EMAIL_USER}>"
        msg['To'] = scrisoare.mail
        msg['Subject'] = "Confirmare: Scrisoarea ta a ajuns la Polul Nord!"
        body = f"""
        Salutare, {scrisoare.nume}!
        
        Eu sunt Alabaster Snowball, șeful elfilor responsabili cu corespondența.
        Îți scriu pentru a-ți confirma că am primit scrisoarea ta în siguranță!
        
        Moș Crăciun s-a bucurat să afle că la {scrisoare.varsta} ani ai tăi, i-ai scris următorul mesaj:
        "{scrisoare.mesaj}"

        Vom pregăti sania în curând! Sărbători fericite!
        
        Cu drag,
        Echipa de la Polul Nord
        """
        msg.attach(MIMEText(body, 'plain', 'utf-8'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
        server.quit()

        return {"message": f"Alabaster Snowball: Am preluat scrisoarea, {scrisoare.nume}. Am trimis o confirmare pe e-mail!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la trimiterea e-mailului: {str(e)}")

class UserCreate(BaseModel):
    email: str
    password: str


def get_db_connection():
    return oracledb.connect(user=ORACLE_USER, password=ORACLE_PASSWORD, dsn=ORACLE_DSN)

@app.get("/")
def home():
    return {"message": "Sistemul de utilizatori este activ!"}

# @app.post("/register")
# def register_user(user: UserCreate):
#     return {
#         "message": "Cont creat cu succes!",
#         "email_inregistrat": user.email
#     }

@app.post("/register")
def register_user(user: UserCreate):
    ## parola este convertita in bytes, apoi criptata direct cu bcrypt, 
    # iar la final este transformata inapoi in text
    bytes_password = user.password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(bytes_password, salt).decode('utf-8')

    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO utilizatori (email, parola) VALUES (:email, :parola)
                """
                cursor.execute(sql, email=user.email, parola=hashed_password)
                connection.commit()
        return {"message": "Cont creat cu succes!"}
    except oracledb.IntegrityError:
        raise HTTPException(status_code=400, detail="Acest e-mail exista deja in sistem")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare de server: {str(e)}")


@app.post("/login")
def login_user(user: UserCreate):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sql = "SELECT parola FROM utilizatori WHERE email = :email"
                cursor.execute(sql, email=user.email)
                rand_gasit = cursor.fetchone()

                if not rand_gasit:
                    raise HTTPException(status_code=401, detail="E-mailul nu a fost gasit sau parola este gresita")

                hash_din_db = rand_gasit[0]
                parola_introdusa_bytes = user.password.encode('utf-8')
                hash_db_bytes = hash_din_db.encode('utf-8')

                if not bcrypt.checkpw(parola_introdusa_bytes, hash_db_bytes):
                    raise HTTPException(status_code=401, detail="E-mailul nu a fost gasit sau parola este gresita")

        return {"message": "Autentificare cu succes!", "email": user.email}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare de server: {str(e)}")   
       