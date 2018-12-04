namespace AngularMvcProject.Models
{
    public class BusinessHourInfo
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string NameOfDay { get; set; }
        public int NameOfDayAsNumber { get; set; }
        public bool IsOffAllDay { get; set; }
        public bool IsOpen { get; set; }
        public string CreationDate { get; set; }
    }
}