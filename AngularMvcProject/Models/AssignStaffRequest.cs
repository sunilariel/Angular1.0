namespace AngularMvcProject.Models
{
    public class AssignStaffRequest
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string CreationDate { get; set; }
    }
}