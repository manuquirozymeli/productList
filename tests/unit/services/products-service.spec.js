const productsService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('Ejercicio 1 - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('1) El método estático getProducts debería responder con un array de productos cuando la petición es exitosa', async () => {
        const res = await productsService.getProducts('MLA', 'tablet');
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
            }
        });
        expect(typeof res).toBe('object');
    });
})

describe('OPCIONAL: manejo de error de getProducts', () => {
    beforeEach(() => {
       mockGet.mockRejectedValueOnce('error');
    });

    it('2) Si la petición falla, arrojar un array vacío como respuesta', async () => { 
        const res = await productsService.getProducts(null);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
    });
});

xdescribe('Ejercitación Integradora - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('3) Hace el llamado a la API utilizando la propiedad `offset` para cargar los siguientes productos', async () => {
        const res = await productsService.getProducts('MLA', 'tablet', 10);
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                offset: 10,
                limit: undefined
            }
        });
        expect(typeof res).toBe('object');
    });
});

xdescribe('OPCIONAL - productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('4) Hace el llamado a la API utilizando las propiedades `offset` y `limit` para cargar los siguientes productos', async () => {
        const res = await productsService.getProducts('MLA', 'tablet', 10, 20);
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                offset: 10,
                limit: 20
            }
        });
        expect(typeof res).toBe('object');
    });
});

