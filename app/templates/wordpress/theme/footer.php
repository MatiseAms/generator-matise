<?php
/**
 * Footer
 *
 * @author       Matise (matise.nl)
 * @package      Wordpress
 * @subpackage   <%= appName %>
 * @version      1.0
 * @since        1.0
 */
?>
<% if (!cleanInstall) { %>

	</main>

	<footer id="footer">
		<h4>Matise</h4>
	</footer>
	<?php wp_footer(); ?>
<% } %>
</body>
</html>
