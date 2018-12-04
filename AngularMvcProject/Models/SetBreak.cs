namespace AngularMvcProject.Models
{
    public class SetBreak
    {
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
    }
}