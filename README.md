## Lista de conteúdos necessários

### Package installer

[Pip](https://pypi.python.org/pypi/pip)

### Gerar a pasta `lib` e instalar as dependências do projecto 

```pip install -t lib -r requirements.txt ```

### i18n

[Documentação](http://webapp2.readthedocs.io/en/latest/api/webapp2_extras/i18n.html#api-webapp2-extras-i18n)

#### Gerar os ficheiros .mo com base nos ficheiros das traduções da pasta `locale`

```pybabel compile -f -d ./locale```
