using Microsoft.EntityFrameworkCore;
using BlogPostApi.Models;

namespace BlogPostApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "+1-555-0100",
                Address = "123 Main St",
                City = "New York",
                State = "NY",
                ZipCode = "10001",
                Country = "USA",
                DateOfBirth = new DateTime(1990, 5, 15),
                CreatedAt = DateTime.UtcNow.AddDays(-100),
                LastLoginAt = DateTime.UtcNow.AddHours(-2),
                IsActive = true,
                Role = "Admin"
            },
            new User
            {
                Id = 2,
                FirstName = "Jane",
                LastName = "Smith",
                Email = "jane.smith@example.com",
                PhoneNumber = "+1-555-0101",
                Address = "456 Oak Ave",
                City = "Los Angeles",
                State = "CA",
                ZipCode = "90001",
                Country = "USA",
                DateOfBirth = new DateTime(1992, 8, 22),
                CreatedAt = DateTime.UtcNow.AddDays(-50),
                LastLoginAt = DateTime.UtcNow.AddHours(-5),
                IsActive = true,
                Role = "User"
            }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Wireless Headphones",
                Description = "High-quality wireless headphones with noise cancellation",
                Sku = "WH-1000XM4",
                Price = 349.99m,
                DiscountPrice = 299.99m,
                Category = "Electronics",
                Brand = "TechAudio",
                StockQuantity = 150,
                Rating = 4.5,
                ReviewCount = 1250,
                ImageUrl = "https://example.com/images/headphones.jpg",
                CreatedAt = DateTime.UtcNow.AddDays(-60),
                UpdatedAt = DateTime.UtcNow.AddDays(-10),
                IsAvailable = true,
                Tags = new[] { "wireless", "bluetooth", "noise-cancelling", "premium" }
            },
            new Product
            {
                Id = 2,
                Name = "Mechanical Keyboard",
                Description = "RGB mechanical gaming keyboard with Cherry MX switches",
                Sku = "KB-RGB-2024",
                Price = 129.99m,
                DiscountPrice = 99.99m,
                Category = "Computer Accessories",
                Brand = "GameTech",
                StockQuantity = 85,
                Rating = 4.7,
                ReviewCount = 876,
                ImageUrl = "https://example.com/images/keyboard.jpg",
                CreatedAt = DateTime.UtcNow.AddDays(-45),
                UpdatedAt = DateTime.UtcNow.AddDays(-3),
                IsAvailable = true,
                Tags = new[] { "mechanical", "rgb", "gaming", "cherry-mx" }
            },
            new Product
            {
                Id = 3,
                Name = "4K Monitor",
                Description = "27-inch 4K UHD monitor with HDR support",
                Sku = "MON-4K-27",
                Price = 599.99m,
                DiscountPrice = 549.99m,
                Category = "Monitors",
                Brand = "DisplayPro",
                StockQuantity = 42,
                Rating = 4.6,
                ReviewCount = 532,
                ImageUrl = "https://example.com/images/monitor.jpg",
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                UpdatedAt = DateTime.UtcNow.AddDays(-1),
                IsAvailable = true,
                Tags = new[] { "4k", "hdr", "gaming", "professional" }
            }
        );
    }
}
