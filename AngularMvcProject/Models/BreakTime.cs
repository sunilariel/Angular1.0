namespace AngularMvcProject.Models
{
    public class BreakTime
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
    }
}