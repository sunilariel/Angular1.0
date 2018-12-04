namespace AngularMvcProject.Models
{
    public class CompanyPurchase
    {
        public string StripeEmail { get; set; }
        public string StripeToken { get; set; }
        public string StripeProductId { get; set; }
        public int CompanyId { get; set; }
        public int ProductId { get; set; }
        public int Id { get; set; }
        public decimal Cost { get; set; }
        public string Name { get; set; }
    }
}