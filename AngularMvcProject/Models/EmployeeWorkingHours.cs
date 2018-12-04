namespace AngularMvcProject.Models
{
    public class EmployeeWorkingHours
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int NameOfDay { get; set; }
        public string NameOfDayAsString { get; set; }
        public bool IsOffAllDay { get; set; }
        public string CreationDate { get; set; }
    }
}