# Testing task Shopify
1. Create a test store +
2. Install the theme in a store (just an empty skeleton of the theme, and work in it)+
3. Deploy the project locally using the Theme Kit +
4. Create several products for development and testing (you can import this CSV file) +
5. Make header and product section (layout):
- all components are custom (you can follow the example of other themes, but not copy-paste)
- you need to use liquid, language variables, and a theme customizer to fill the content (there should be no static, everything changes dynamically either through the customizer or through the product admin panel)
- the ability to customize the navigation header through the navigation section in the admin panel
- adaptability (mobile, tablet, desktop)
- technologies: theme kit, BEM, scss, webpack or gulp +
- commit everything in git, each ready-made functionality is a separate commit, upload the result to your Github
6. Make an ajax cart (without using apps) (layout, example)
- the ability to change the quantity and remove items from a basket
7. Provide a link to GitHub, a link to the store with access to the admin panel

theme get --password=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 --store="my-store444444.myshopify.com" --themeid=124559720619          
