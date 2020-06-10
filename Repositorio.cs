using System;
using System.Collections.Generic;

namespace ConsumindoApiGithub
{
    public class Repositorio
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Linguagem { get; set; }
        public string UltimaAtualizacao { get; set; }
        public string AutorRepositorio { get; set; }
        public List<string> Contribuidores = new List<string>();

    }
}
