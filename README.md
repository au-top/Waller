# Waller

Is One Error Watch Program

use `MongoDB`

db config  is `src/db.ts`


## Use

```

sh install.sh

sh make.sh

```

Edit `dist/wallerConfig.json` Config File

```
    // Use WallerToken Prevent the interface from being called maliciously
    ewToken: string;
    // Used to protect the `/show` interface
    ewPasswd: string;
    // Push to mailbox when error occurs
    ewRecvEmail?:string;
    // Email needs email account use IMAP/SMTP (any) 
    email?:string
    // IMAP/SMTP service of Key
    emailPasswd?:string
    //use secure SSL
    emailServicePortSecure:bool
    //you email service port
    emailServicePort:number
    //you email service host
    emailServiceHost:string
```

Case

```json
{
    "ewToken": "",
    "ewPasswd": "",
    "ewRecvEmail":"is you recv email",
    "emailServiceHost":"you email service host",
    "emailServicePort": 465,
    "emailServicePortSecure": true,
    "email":"is you send email",
    "emailPasswd":"is a IMAP/SMTP of key"
}
```


## API
## The following APIs may be out of date Latest reference postman config

### /ew/recv

Method `POST`

is a send Error Info To Service


API recv data struct is 

```json
 {
    "level": 100,
    "appName": "test",
    "appVersion": "0.0.1",
    "allErrorInfo": "this is a test!",
    "clientId": "Postman",
    "minErrorInfo": "this is a test mini info",
    "otherInfo": {"hello":"helloOvO"},
    "token":""
}
```


### /ew/show

Method `POST`

API show ALL error Info 

API recv data struct is 

```json
{
    "passwd":""
}
```

---

is a `Postman` export test req

PostmanConfig file in Project file , File name of `waller.postman_collection`