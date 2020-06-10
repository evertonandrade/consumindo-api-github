using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ConsumindoApiGithub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositorioController : ControllerBase
    {
        private static readonly string[] Summaries;

        private readonly ILogger<RepositorioController> _logger;

        public RepositorioController(ILogger<RepositorioController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Repositorio> Get()
        {
            return null;
        }
    }
}
