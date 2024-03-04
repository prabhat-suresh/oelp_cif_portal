*Bold implies required fields*
1. /signup <br>
	Expects {<br>
		**username**: string (minimum 3,  maximum 20), <br>
		**email**: string <br>
		**password**: string <br>
		**mobile**: string <br>
		**department**: string <br>
		**role**: String (by default role is Student) <br>
	}
	Returns JSON response:
	if user already exists
	{
		"status": 400,
		"error": "User already exists"
	}
	if successful
	{
		message: "User created successfully",
		success: true,
		status: 201,
    	}
   	if server error
   	{
		error: error.message,
		status: 500
	}
