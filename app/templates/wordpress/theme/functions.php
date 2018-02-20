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
	$include_url = get_template_directory_uri();
	$include_url = str_replace('https://', '//', $include_url);
	$include_url = str_replace('http://', '//', $include_url);
	
	// Loads our main stylesheet.
	wp_enqueue_style('theme-css', $include_url.'/css/app.css');
	
	// Theme stylesheet.
	wp_enqueue_style( 'theme-style', get_stylesheet_uri() );

	wp_enqueue_script( 'theme-appjs', get_theme_file_uri( '/js/app.js' ), array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
