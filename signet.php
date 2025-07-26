<?php
/**
 * Format bookmarks using a rich representation of the corresponding linked Web pages.
 *
 * @package   Signet
 * @author    imath
 * @license   MIT
 * @link      https://imathi.eu
 *
 * @retraceur-block
 * Plugin Name:        Signet
 * Plugin URI:         https://github.com/imath/signet
 * Plugin Type:        block
 * Description:        Format bookmarks using a rich representation of the corresponding linked Web pages.
 * Version:            1.0.0
 * Author:             imath
 * Author URI:         https://imathi.eu
 * Requires Retraceur: 1.0.0
 * Up to Retraceur:    2.0.0-alpha
 * Requires PHP:       5.6
 * Text Domain:        signet
 * License:            MIT License
 * License URI:        https://github.com/imath/signet/blob/trunk/LICENSE.md
 * Domain Path:        /languages/
 * GitHub Plugin URI:  https://github.com/imath/signet
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Signet Block.
 *
 * @since 1.0.0
 */
function signet_block_init() {
	register_block_type( dirname( __FILE__ ) . '/build' );
}
add_action( 'init', 'signet_block_init' );
