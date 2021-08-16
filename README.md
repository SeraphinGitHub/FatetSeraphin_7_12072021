
    Vidéo Demo:
    https://www.youtube.com/watch?v=2B86xBcuW1s

    ==============================================================================================================
    ==> MySQL is needed for this Project !      ( My own Version is 8.0.20 )
    ==============================================================================================================

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
    
    ### ==> If you already have localStorage on localhost:8080 it's better to clear it !

    ******************************          That's all !        ******************************
    
    ==> Enjoy =) !
