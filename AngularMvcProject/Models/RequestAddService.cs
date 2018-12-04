namespace AngularMvcProject.Models
{
    public class RequestAddService
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int DurationInMinutes { get; set; }

        public int DurationInHours { get; set; }

        public float Cost { get; set; }

        public string Currency { get; set; }

        public string Colour { get; set; }

        public string CreationDate { get; set; }
    }
}