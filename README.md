# review-app

```
POST /api/user/create
POST /api/user/login

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
    "review": "" # optional
}
RESP: {
    "success": boolean,
    "data": {
        "message": "",
        "review_id": ""
    }
}



GET /api/review/like/:review_id
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "review liked"
    }
}



GET /api/review/report/:review_id
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "review reported"
    }
}



POST /api/review/respond/:review_id
REQ: {
    "comment": "" # required
}
RESP: {
    "success": boolean,
    "data": {
        "message": "organizers comment added"
    }
}


```
