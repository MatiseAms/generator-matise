<?php
/**
 * Functions page
 *
 * @author       Matise (matise.nl)
 * @package      Wordpress
 * @subpackage   <%= appName %>
 * @version      1.0
 * @since        1.0
 */

/**
 * Enqueue scripts and styles.
 */
function theme_scripts() {
	// Theme stylesheet.
	wp_enqueue_style( 'theme-style', get_stylesheet_uri() );

	wp_enqueue_script( 'theme-appjs', get_theme_file_uri( '/js/app.js' ), array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
