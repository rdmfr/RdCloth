# RdCloth

RdCloth is a React storefront for a Bandung-based heavyweight streetwear and custom apparel studio. The interface combines product browsing, custom order requests, checkout, order tracking, and a small admin workspace in one application.

The visual direction uses classical references without making them the product: dark editorial sections, antique-gold accents, Cinzel headings, and a Greek motto in the campaign areas.

## What is included

- Homepage with the current campaign, featured products, brand story, and community gallery.
- Product listing and product detail views with variants, stock, wishlist, and quick add actions.
- Cart drawer and checkout flow with IDR formatting and WhatsApp-oriented order details.
- Custom order form for garment type, placement, print method, quantity, and artwork details.
- Order tracking by invoice code.
- Admin view for editing products, homepage content, settings, and order state.
- Responsive layouts for desktop and mobile.

## Stack

- React 19 and TypeScript
- Vite 6
- Tailwind CSS 4
- Motion and Lucide React
- Express with `tsx` for the local server

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/rdmfr/RdCloth.git
cd RdCloth
npm install
npm run dev
```

Open <http://localhost:3000> after the server starts.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Express/Vite development server. |
| `npm run lint` | Run the TypeScript check without emitting files. |
| `npm run build` | Build the frontend and bundle the server. |
| `npm run start` | Run the bundled production server after a build. |
| `npm run preview` | Preview the Vite production output. |

## Project layout

```text
src/
  components/   Shared interface elements such as the header, cart, and product card
  context/      Store state and actions
  data/         Seed products, CMS content, settings, and sample orders
  utils/        Formatting helpers
  views/        Homepage, shop, product, checkout, account, and admin screens
public/         Static images and other public assets
server.ts       Local Express server and Vite integration
```

## Notes

The project currently uses seeded data from `src/data/initialData.ts`. It is suitable for prototyping the storefront experience; payment processing, production authentication, and a persistent database still need to be connected before launch.

Product and homepage content can be edited through the admin view during local development. Keep real customer data and credentials out of the seed files and repository.

## License

No open-source license has been added yet.