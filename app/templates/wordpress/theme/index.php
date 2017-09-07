<?php
/**
 * Index page
 *
 * @author       Matise (matise.nl)
 * @package      Wordpress
 * @subpackage   <%= appName %>
 * @version      1.0
 * @since        1.0
 */
?>

<?php get_header(); ?>

<% if (!cleanInstall) { %>
<section id="home">
	<h1><%= siteTitle %></h1>
	<p>Welcome to your new project!</p>
	<p>Good luck and make it awesomes..</p>
  <hr />
  <p>Need help? <a class="button-matiseblue" target="_blank" href="http://docs.matise.design">Matise Docs</a></p>
</section>
<% } %>

<?php get_footer(); ?>
