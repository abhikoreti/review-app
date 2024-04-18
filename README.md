# Review API

### [Review API Docs](https://documenter.getpostman.com/view/33893243/2sA35K2Ltq)

1. POST /api/user/create

```
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
```

2. POST /api/user/login

```
REQ: {
    "username": "", # required
    "password": ""  # required
}
RESP: {
    "id": "**user_id**",
    "username": "**user_name**",
    "email": "**user_email**",
    "roles": [
        "ROLE_"
    ],
    "accessToken": "**access_token**"
}
```

3. GET /api/user/attended/:eventid

```
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "User **user_name** attended **event_title** successfully!"
    }
}
```

4. POST /api/event/create

```
REQ: {
    "eventid": "", # required
    "title": "", # optional
}
RESP: {
    "success": boolean,
    "data": {
        "message": "Event **event_id** created by organizer **user_name** successfully",
    }
}
```

5. GET /api/event/summary/:eventid

```
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "Summarized reviews of **event_title**",
        "avg_registration_exp": [1 - 10],
        "avg_event_exp": [1-10],
        "avg_breakfast_exp": [1-10],
        "avg_overall_exp": [1-10],
    }
}
```

6. GET /api/event/reviews/:eventid/:page_number

```
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "Page 1/2/3 : Reviews of **event_title** event",
        "totalReviews": "",
        "page": "1/2/3... of [1/2/3...]",
        "reviews": [
            { review_obj_1 },
            { review_obj_2 },
            { review_obj_3 },
        ]
    }
}
```

7. POST /api/review/submit/:eventid

```
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
        "message": "User **user_name**'s review submitted for **event_title** event successfully!",
        "reviewid": "review_id"
    }
}
```

8. GET /api/review/like/:reviewid

```
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "User liked the review successfully!"
    }
}
```

9. GET /api/review/report/:reviewid

```
REQ: None
RESP: {
    "success": boolean,
    "data": {
        "message": "User reported the review successfully!"
    }
}
```

10. POST /api/review/respond/:reviewid

```
REQ: {
    "organizer_response": "" # required
}
RESP: {
    "success": boolean,
    "data": {
        "message": "Organizer **user_name** submitted response for event successfully!"
    }
}
```
