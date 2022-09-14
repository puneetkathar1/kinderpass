import Cookies from "cookies";

export default (req, res) => {
  const cookies = new Cookies(req, res);

  //Removing cookies, to logout the user
  cookies.set("email");
  cookies.set("token");
  cookies.set('clientEmail')
  
  //Redirecting to Signin screen after logout
  res.writeHead(302, { Location: "/" });
  res.end();
};
