require('./sections/root/footer-controller');
require('./sections/root/header-controller');

require('./sections/home/home-controller');

<% if(showKitchensink) { %>
require('./sections/kitchensink/kitchensink-controller');
<% } %>
