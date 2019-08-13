using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NG_Core_Auth.Data;
using NG_Core_Auth.Models;

namespace NG_Core_Auth.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly AppDbContext _db;

        public ProductController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        [Authorize(Policy = "RequireLoggedId")]
        public IActionResult GetProducts()
        {
            return Ok(_db.Products.ToList());
        }

        [HttpPost("[action]")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> AddProduct([FromBody] ProductModel model)
        {
            var newProduct = new ProductModel()
            {
                Name = model.Name,
                Description = model.Description,
                ImgUrl = model.ImgUrl,
                OutOfStock = model.OutOfStock,
                Price = model.Price,
            };

            await _db.Products.AddAsync(newProduct);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var findProduct = _db.Products.FirstOrDefault(x => x.ProductId == id);

            if (findProduct == null)
            {
                return NotFound();
            }

            //If the product was found

            findProduct.Name = model.Name;
            findProduct.Description = model.Description;
            findProduct.ImgUrl = model.ImgUrl;
            findProduct.OutOfStock = model.OutOfStock;
            findProduct.Price = model.Price;

            _db.Entry(findProduct).State = EntityState.Modified;

            await _db.SaveChangesAsync();

            return Ok(new JsonResult("The Product with " + id + " is updated"));
        }

        [HttpDelete("[action]/{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var findProduct = await _db.Products.FindAsync(id);
            
            if (findProduct == null)
            {
                return NotFound();
            }

            _db.Products.Remove(findProduct);

            await _db.SaveChangesAsync();

            return Ok(new JsonResult("The Product with " + id + " is deleted"));
        }
    }
}