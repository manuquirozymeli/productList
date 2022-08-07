const request = require('supertest');
const api = require('../../../index');
const ProductsService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('Ejercicio 1 - El router de /api/get-products', () => {
    mockGet
        .mockResolvedValueOnce({ data: {
            results: [
                { 
                    id: 'MLA457223',
                    title: 'Ipad Air'
                }       
            ]
        }})
        .mockResolvedValueOnce({ data: {
            results: [
                { 
                    id: 'MLA457223',
                    title: 'Ipad Air'
                }       
            ]
        }})
        .mockRejectedValueOnce('Error');


    const mockGetProducts = jest.spyOn(ProductsService, 'getProducts');

    it('1) Utiliza el servicio para buscar los productos de la API de MeLi', async () => {
        await request(api.app).get('/api/get-products?domain_override=mercadolibre.com.ar&name=tablet');

        expect(mockGetProducts).toHaveBeenCalled();
    });


    it('2) Responde con los productos de la API de MeLi cuando la llamada es exitosa', async () => {
        const response = await request(api.app).get('/api/get-products?domain_override=mercadolibre.com.ar&name=tablet');
        const products = await JSON.parse(response.res.text);

        expect(products).toBeDefined();
        expect(typeof products).toBe('object');
    });

    it('3) Responde con un array vacío cuando hay un error en la llamada', async () => {
        const response = await request(api.app).get('/api/get-products?domain_override=mercadolibre.com.ar&name=tablet');
        const errorResponse = response.res.text;

        expect(errorResponse).toEqual("[]");
    });
});
