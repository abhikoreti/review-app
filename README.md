# review-app

```
POST /api/user/create --> same as signup in tutorial
POST /api/user/login --> same as signin in tutorial

GET /api/user/attended/:event_name
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "user __username__ attended __event_name__"
    }
}


POST /api/event/create
REQ: {
    "event_name": "", required
    "organized_by": [
        "username1/2/3",
    ]
}
RESP: {
    "success": boolean,
    "data": {
        "message": "event __event_name__ created successfully",
    }
}


GET /api/event/summary/:event_name
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "summarized reviews of __event_name__",
        "avg_registration_exp": [1 - 10],
        "avg_event_exp": [1-10],
        "avg_breakfast_exp": [1-10],
        "avg_overall_exp": [1-10],
    }
}


GET /api/event/reviews/:event_name/:page_number
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "page 1/2/3 : reviews of __event_name__",
        "reviews": [
            { review_obj_1 },
            { review_obj_2 },
            { review_obj_3 },
        ]
    }
}



POST /api/review/submit/:event_name
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
