using System;

namespace AngularMvcProject.Extensions
{
    public static class CommonHelper
    {
        public static int StringDayOfWeekToInt(string dayOfWeek)
        {
            switch (dayOfWeek)
            {
                case "Monday": return 1;
                case "Tuesday": return 2;
                case "Wednesday": return 3;
                case "Thursday": return 4;
                case "Friday": return 5;
                case "Saturday": return 6;
                case "Sunday": return 7;
            }

            throw new Exception("Invalid Day Of Week");
        }
    }
}