namespace AngularMvcProject.Models
{
    public class Employees
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string TelephoneNo { get; set; }

        public string CreationDate { get; set; }

        public bool confirmed { get; set; }
    }
}