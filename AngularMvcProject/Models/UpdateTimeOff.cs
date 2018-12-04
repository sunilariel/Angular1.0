namespace AngularMvcProject.Models
{
    public class UpdateTimeOff
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
        public bool IsOffAllDay { get; set; }
    }
}