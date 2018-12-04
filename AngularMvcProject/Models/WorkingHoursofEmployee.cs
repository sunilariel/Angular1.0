namespace AngularMvcProject.Models
{
    public class WorkingHoursofEmployee
    {
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string DateOfBooking { get; set; }
        public string Day { get; set; }
    }
}