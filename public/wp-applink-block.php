<?php
/*!
Plugin Name: WP Applink Block
Plugin URI: http://www.example.com/myplugin
Description: プラグインの説明
Author: e-JOINT.jp
Version: 0.1.0
Author URI: http://e-joint.jp
License: GPL2
*/

/*  Copyright 2022 e-JOINT.jp (email : mail@e-joint.jp)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
     published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

namespace wpalb;

define('WPALB_ASSETS_CACHE', '2022-03-03 00:13');

include_once plugin_dir_path(__FILE__) . 'define.php';
include plugin_dir_path(__FILE__) . 'admin-page.php';


// プラグイン有効時に実行
if (function_exists('wpalb\register_activation_hook')) {
  register_activation_hook(__FILE__, 'wpalb\register_activation');
}

// オプション値の初期化
function register_activation()
{
  $options = get_option('wpalb-setting');
  var_dump($options);
  if (!$options) {
    $default = array(
      'token' => '11l64V',
      'country' => 'JP',
      'lang' => 'ja_jp'
    );

    update_option('wpalb-setting', $default);
  }
}

/**
 * TailwindCSS
 */
add_action('wp_enqueue_scripts', 'wpalb\tailwindcss');
add_action('enqueue_block_editor_assets', 'wpalb\tailwindcss');
function tailwindcss()
{
  // TainwindCSS Base
  wp_register_style(
    'merihari-tailwind-base',
    plugins_url('dist/tailwind-base.css', __FILE__),
    WPALB_ASSETS_CACHE,
    '',
    'all'
  );
}


/**
 * ブロックを登録
 */
function register_block()
{
  // Main JS
  wp_register_script(
    'wp-applink-block-editor',
    plugins_url('dist/block.js', __FILE__),
    ['wp-element', 'wp-block-editor', 'wp-blocks', 'wp-components'],
    WPALB_ASSETS_CACHE,
    true
  );

  // JS for frontend
  wp_register_script(
    'wp-applink-block',
    plugins_url('dist/front.js', __FILE__),
    [],
    WPALB_ASSETS_CACHE,
    true
  );
  // wp_set_script_translations('wp-applink-block-editor', 'wp-applink-block-blocks');

  // エディタ用CSS
  wp_register_style(
    'wp-applink-block-editor',
    plugins_url('dist/editor-style.css', __FILE__),
    ['merihari-tailwind-base'],
    WPALB_ASSETS_CACHE,
    'all'
  );

  $options = get_option('wpalb-setting');
  if (!isset($options['nocss'])) {
    // フロント・エディタ両方用CSS
    wp_register_style(
      'wp-applink-block',
      plugins_url('dist/style.css', __FILE__),
      ['merihari-tailwind-base'],
      WPALB_ASSETS_CACHE,
      'all'
    );
  }

  // ブロックを登録
  register_block_type('merihari/applink', array(
    'script' => 'wp-applink-block',
    'editor_script' => 'wp-applink-block-editor',
    'style'         => 'wp-applink-block',
    'editor_style'  => 'wp-applink-block-editor'
  ));
}
add_action('init', 'wpalb\register_block');

// ブロックのカテゴリー登録
if (!function_exists('merihari_categories')) {
  function merihari_categories($categories, $post)
  {
    return array_merge(
      $categories,
      array(
        array(
          'slug'  => 'merihari',   // ブロックカテゴリーのスラッグ.
          'title' => 'merihari blocks'  // ブロックカテゴリーの表示名.
        ),
      )
    );
  }
  add_filter('block_categories_all', 'wpalb\merihari_categories', 10, 2);
}


function admin_enqueue_scripts()
{
  /**
   * PHPで生成した値をJavaScriptに渡す
   *
   * 第1引数: 渡したいJavaScriptの名前（wp_enqueue_scriptの第1引数に書いたもの）
   * 第2引数: JavaScript内でのオブジェクト名
   * 第3引数: 渡したい値の配列
   */
  wp_localize_script(
    'wp-applink-block-editor',
    'wpalbAjaxValues',
    [
      'api' => admin_url('admin-ajax.php'),
      'action' => 'wpalb-action',
      'nonce' => wp_create_nonce('wpalb-ajax'),
      'optionsPageUrl' => admin_url('options-general.php?page=wpalb-setting'),
      'options' => get_option('wpalb-setting'),
      'limitValues' => WPALB_LIMIT_VALUES,
      'countryValues' => WPALB_COUNTRY_VALUES,
      'langValues' => WPALB_LANG_VALUES
    ]
  );
}
add_action('admin_enqueue_scripts', 'wpalb\admin_enqueue_scripts');


// Ajaxで返す値
function ajax()
{
  if (wp_verify_nonce($_POST['nonce'], 'wpalb-ajax')) {

    $URL = $_POST['url']; //取得したいサイトのURL
    echo file_get_contents($URL);
    die();
  }
}
add_action('wp_ajax_wpalb-action', 'wpalb\ajax');
