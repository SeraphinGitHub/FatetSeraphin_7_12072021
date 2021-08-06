
After download repo :

    ==> Open it's folder with VsCode
    
    ==> Rename the "example.env" file as ".env"
    
    ==> Fullfill the same ".env" file with your own specs
        ( No needs to change  - DB_Host - DB_Port - Admin_ImageUrl - )
    
    ==> Inside VsCode, create 2 terminal windows, then :

        ==> First terminal window type "cd front"
        ==> Hit "enter" then type "npm run serve"
            (then wait, if everything's good the response should be green with redirect to localhost:8080)

        ==> Second terminal window type "cd back"
        ==> Hit "enter" then type "nodemon"
            (then wait, if everything's good the end of the response should show "-Admin- created successfully !")

    ******************************          That's all !        ******************************
    
    ==> Enjoy =) !