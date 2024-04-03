# Review API

### [Review API Docs](https://documenter.getpostman.com/view/33893243/2sA35K2Ltq)

```
POST /api/user/create
REQ: {
    "username": "",  # required
    "email": "",     # required
    "password": "",  # required
    "roles": ["role1", "role2"]  # required
}
RESP: {
    "success": boolean,
    "data": {
        "message": "User was registered successfully!"
    }
}

POST /api/user/login
REQ: {
    "username": "", # required
    "password": ""  # required
}
RESP: {
    "id": "",
    "username": "",
    "email": "",
    "roles": [
        "ROLE_"
    ],
    "accessToken": ""
}

GET /api/user/attended/:eventid
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "user __username__ attended __eventid__"
    }
}


POST /api/event/create
REQ: {
    "eventid": "", # required
    "title": "", # optional
}
RESP: {
    "success": boolean,
    "data": {
        "message": "event __eventid__ created by organizer __user_name__ successfully",
    }
}

TODO:
GET /api/event/summary/:eventid
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "summarized reviews of __eventid__",
        "avg_registration_exp": [1 - 10],
        "avg_event_exp": [1-10],
        "avg_breakfast_exp": [1-10],
        "avg_overall_exp": [1-10],
    }
}

TODO:
GET /api/event/reviews/:eventid/:page_number
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "page 1/2/3 : reviews of __eventid__",
        "reviews": [
            { review_obj_1 },
            { review_obj_2 },
            { review_obj_3 },
        ]
    }
}



POST /api/review/submit/:eventid
REQ: {
    "registration_exp": [1 - 10], # required/optional
    "event_exp": [1-10], # required/optional
    "breakfast_exp": [1-10], # required/optional

    "overall_exp": [1-10], # optional
    "comment": "" # optional
}
RESP: {
    "success": boolean,
    "data": {
        "message": "",
        "reviewid": ""
    }
}



GET /api/review/like/:reviewid
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "review liked"
    }
}



GET /api/review/report/:reviewid
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "review reported"
    }
}



POST /api/review/respond/:reviewid
REQ: {
    "organizer_response": "" # required
}
RESP: {
    "success": boolean,
    "data": {
        "message": "organizers comment added"
    }
}


```
