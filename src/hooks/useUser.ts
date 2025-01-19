"use server";


export const adminLogin = async (username: string, password: string) => {
  try {
    const raw = JSON.stringify({
      email: username,
      password: password,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    );

    const data = await response.json();
    
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
    //return error;
  }
};

export const userLogin = async (username: string, password: string) => {
  try {
    const raw = JSON.stringify({
      email: username,
      password: password,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    );

    const data = await response.json();
    
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
    //return error;
  }
};

export const getLoginData = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAdminLoginData = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};




