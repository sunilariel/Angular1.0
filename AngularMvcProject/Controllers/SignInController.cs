using AngularMvcProject.Models;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AngularMvcProject.Controllers
{
    public class SignInController : Controller
    {
        const string AdminRole = "Admin";
        const string StaffRole = "Staff";
        
        [HttpPost]
        public JsonResult postdata(string json)
        {
            try { 
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Authenticate/login";

            HttpWebRequest httpRequest = HttpWebRequest.CreateHttp(apiURL);
            httpRequest.Method = "POST";
            httpRequest.ProtocolVersion = HttpVersion.Version10;
            httpRequest.ContentType = "application/x-www-form-urlencoded";
            httpRequest.ContentLength = json.Length;

            LoginInfo info = JsonConvert.DeserializeObject<LoginInfo>(json);
            string username = info.Email;
            string password = info.Password;
            string encoded = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(username + ":" + password));
            httpRequest.Headers.Add("Authorization", "Basic " + encoded);

            var streamWriter = new StreamWriter(httpRequest.GetRequestStream());
            streamWriter.Write(json);
            streamWriter.Close();

            var data = httpRequest.GetResponse();
            var response = (HttpWebResponse)httpRequest.GetResponse();
            var role = data.Headers["RoleType"];
            if (response.StatusCode == HttpStatusCode.OK && (role == AdminRole || role == StaffRole))
            {
                string token = data.Headers["Token"];
                return Json(new { success = true, IsAdmin = (role == AdminRole), CompanyId = data.Headers["CompanyId"], Token = token }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, message = "Invalid credentials" }, JsonRequestBehavior.AllowGet);
            }
        }
            catch(Exception e)
            {
                return Json(e.ToString());
            }
        }

        [HttpPost]
        public JsonResult RecoverPassword(string json)
        {
            try
            {
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/SendForgotPasswordEmail";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {

                    var jsonString = new JavaScriptSerializer().Serialize(json);
                    streamWriter.Write(jsonString);
                    streamWriter.Flush();
                    streamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                return Json(new { success = false, message = "Password Recovery Email Sent. Please check yor Inbox." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.ToString());
            }
        }
    }
}