namespace AngularMvcProject.Models
{
    public class AppointmentDetails
    {
        public string BookingId { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int DurationInMinutes { get; set; }
        public int DurationInHours { get; set; }
        public double Cost { get; set; }
        public string Currency { get; set; }
        public string Colour { get; set; }
        public int Status { get; set; }
        public string BookingStatusDisplay { get; set; }
        public int CustomerId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}