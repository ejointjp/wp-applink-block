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


// include_once plugin_dir_path(__FILE__) . 'inc/content.php';
// include_once plugin_dir_path(__FILE__) . 'inc/return_json.php';


// 初期設定
if (!function_exists('wpalb_init')) {
  function wpalb_init()
  {
    // Main JS
    wp_register_script(
      'wp-applink-block-editor',
      plugins_url('dist/index.js', __FILE__),
      [],
      '',
      true
    );
    // wp_set_script_translations('wp-applink-block-editor', 'wp-applink-block-blocks');

    // エディタ用CSS
    wp_register_style(
      'wp-applink-block-editor',
      plugins_url('dist/editor-style.css', __FILE__),
      [],
      '',
      'all'
    );

    // フロント・エディタ両方用CSS
    wp_register_style(
      'wp-applink-block',
      plugins_url('dist/style.css', __FILE__),
      [],
      '',
      'all'
    );

    // ブロックを登録
    register_block_type('merihari/applink', array(
      'editor_script' => 'wp-applink-block-editor',
      'editor_style'  => 'wp-applink-block-editor',
      'style'         => 'wp-applink-block'
    ));
  }
}
add_action('init', 'wpalb_init');

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
  if (class_exists('WP_Block_Editor_Context')) {
    add_filter('block_categories_all', 'merihari_categories', 10, 2);
  } else {
    add_filter('block_categories', 'merihari_categories', 10, 2);
  }
}


function wpalb_admin_enqueue_scripts()
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
      'actionRemoveCache' => 'wpalb-action-remove-cache', // cache削除用
      'nonceRemoveCache' => wp_create_nonce('wpalb-ajax-remove-cache') // cache削除用
    ]
  );
}
add_action('admin_enqueue_scripts', 'wpalb_admin_enqueue_scripts');


// Ajaxで返す値
function wpalb_ajax()
{
  if (wp_verify_nonce($_POST['nonce'], 'wpalb-ajax')) {

    $URL = $_POST['url']; //取得したいサイトのURL
    echo file_get_contents($URL);
    die();
  }
}
add_action('wp_ajax_wpalb-action', 'wpalb_ajax');
