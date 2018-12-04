using System.Collections.Generic;

namespace AngularMvcProject.Models
{
    public class EmployeeServicedata
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int DurationInMinutes { get; set; }

        public int DurationInHours { get; set; }

        public int Cost { get; set; }

        public string Currency { get; set; }

        public string CreationDate { get; set; }

        public bool AllAssignStaffChecked { get; set; }

        public string staffCheckedCount { get; set; }

        public List<Employees> staff { get; set; }

    }
}