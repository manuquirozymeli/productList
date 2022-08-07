const React = require('react');
const ProductListView = require('../view');
const { render, screen, act, fireEvent, waitFor } = require('@testing-library/react');
require('core-js');
const restClient = require('nordic/restclient');

const { mockGet } = restClient;

describe('La view de ProductList', () => {
    let component; 
    const i18n = { gettext: text => text };
    let mockProducts = [
        { 
            id: 'MLA12874', 
            title: 'Samsung', 
            thumbnail: 'http://http2.mlstatic.com/D_838903-MLA46771080799_072021-I.jpg', 
            permalink: 'https://www.mercadolibre.com.ar/samsung-galaxy-m12-5000-mah-dual-sim-128-gb-black-4-gb-ram/p/MLA18192280' 
        }
    ];

    beforeEach(async () => {  
        await act(async () =>{
            mockGet.mockResolvedValueOnce({ data: [{ 
                id: 'MLA12874', 
                title: 'Motorola', 
                thumbnail: 'http://http2.mlstatic.com/D_695973-MLA49129434222_022022-I.jpg', 
                permalink:'https://www.mercadolibre.com.ar/moto-g31-128-gb-azul-cielo-4-gb-ram/p/MLA18726251'
            }]})
            component = await waitFor(() => render(<ProductListView products={mockProducts} i18n={i18n}/>));
        });
    });
    
    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('2) Renderiza una lista de productos con server-side rendering en el primer render', () => {
        const samsung = screen.getByText(/samsung/i);
        expect(samsung).toBeInTheDocument();
    });
    
    it('3) BONUS: debe modificar la lista de productos al clickear el botón', async () => {
        await act(async () => {
            const button = await screen.findByRole('button');
            fireEvent.click(button);
        });
        
        const title = await screen.findByText('Motorola');
        expect(title).toBeInTheDocument();
    });

    it('OPCIONAL: si no hay productos deberia mostrar el mensaje "No se encontraron productos"', async () => {
        await act(async () =>{
            component = await waitFor(() => render(<ProductListView products={[]} i18n={i18n}/>));
        })
        const message = screen.getByText(/no se encontraron productos/i);
        expect(message).toBeInTheDocument();
    });
});