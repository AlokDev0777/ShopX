import connect from "@/db/connectdb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connect();

    const body = await req.json();

    const { name, email, password } = body;

    if(!name || !email || !password){
      return Response.json(
        {
          message: "fill all fields" ,
          status: false
      },
      {
        status:400
      }
    )
    }

    const customer = await User.findOne({ email });


    if (customer) {
      return Response.json(
        {
          message: "exists.",
          status: false
        },

        {
          status: 400
        }
      );
    }



    
    let hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    

    return Response.json(
      {
        message: "User created successfully",
        status: true,
        user: {
          name: newUser.name,
          email: newUser.email,
        }
      },
      {
        status: 201
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Internal server error",
        status: false
      },
      {
        status: 500
      }
    );
  }
}