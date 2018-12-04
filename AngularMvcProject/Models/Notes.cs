namespace AngularMvcProject.Models
{
    public class Notes
    {
        public int CustomerId { get; set; }
        public int CompanyId { get; set; }
        public string Description { get; set; }
        public string WhoAddedThis { get; set; }
        public string CreationDate { get; set; }
    }
}