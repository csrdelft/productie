<?php

namespace CsrDelft\view\formulier;

/**
 * UrlDownloader.class.php
 *
 * @author Gerrit Uitslag <klapinklapin@gmail.com>
 *
 * Download content van de gegeven url, gebruikt beschikbare mechanisme.
 */
class UrlDownloader {

	/**
	 * Is er uberhaupt een methode beschikbaar
	 * @return bool
	 */
	public function isAvailable() {
		return $this->file_get_contents_available() OR function_exists('curl_init') OR function_exists('fsockopen');
	}

	/**
	 * Download file content met beschikbare middelen
	 *
	 * @param $url
	 * @return mixed|string
	 */
	public function file_get_contents($url) {
		if ($this->file_get_contents_available()) {
			return @file_get_contents($url);
		} elseif (function_exists('curl_init')) {
			return $this->curl_file_get_contents($url);
		} else {
			return $this->dokuhttpclient_get_contents($url);
		}
	}

	/**
	 * Is file_get_contents() beschikbaar om van url te downloaden
	 *
	 * @return bool
	 */
	protected function file_get_contents_available() {
		return in_array(ini_get('allow_url_fopen'), array('On', 'Yes', 1));
	}

	/**
	 * Download met behulp van cURL
	 * @param $url
	 * @return mixed
	 */
	protected function curl_file_get_contents($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		return curl_exec($ch);
	}

	/**
	 * DokuWiki heeft een complete fsocket gebaseerde downloader
	 *
	 * @param $url
	 * @return bool|string
	 */
	protected function dokuhttpclient_get_contents($url) {
		require_once HTDOCS_PATH . 'wiki/inc/HTTPClient.php';
		$http = new \HTTPClient();
		$http->timeout = 12;
		return $http->get($url);
	}

	/**
	 * Gebruik fsocket om bestanden te downloaden
	 * geeft header+body terug, zelf header nog afsplitten
	 *
	 * @param string $url
	 * @return string
	 * @see SimplePie_File
	 */
	protected function fsocket_file_get_contents($url) {
		$timeout = 10;
		$useragent = null;

		$data = '';
		$error = '';

		if ($useragent === null) {
			$useragent = ini_get('user_agent');
		}
		$headers = null;
		if (!is_array($headers)) {
			$headers = array();
		}

		$url_parts = parse_url($url);
		$socket_host = $url_parts['host'];
		if (isset($url_parts['scheme']) && strtolower($url_parts['scheme']) === 'https') {
			$socket_host = "ssl://$url_parts[host]";
			$url_parts['port'] = 443;
		}
		if (!isset($url_parts['port'])) {
			$url_parts['port'] = 80;
		}
		$fp = @fsockopen($socket_host, $url_parts['port'], $errno, $errstr, $timeout);
		if (!$fp) {
			$error = "fsockopen error: $errstr ($errno) ";
			$success = false;
		} else {
			stream_set_timeout($fp, $timeout);
			if (isset($url_parts['path'])) {
				if (isset($url_parts['query'])) {
					$get = "$url_parts[path]?$url_parts[query]";
				} else {
					$get = $url_parts['path'];
				}
			} else {
				$get = '/';
			}
			$out = "GET $get HTTP/1.1\r\n";
			$out .= "Host: $url_parts[host]\r\n";
			$out .= "User-Agent: $useragent\r\n";

			if (isset($url_parts['user']) && isset($url_parts['pass'])) {
				$out .= "Authorization: Basic " . base64_encode("$url_parts[user]:$url_parts[pass]") . "\r\n";
			}
			foreach ($headers as $key => $value) {
				$out .= "$key: $value\r\n";
			}
			$out .= "Connection: Close\r\n\r\n";
			fwrite($fp, $out);

			$info = stream_get_meta_data($fp);
			$data = '';
			while (!$info['eof'] && !$info['timed_out']) {
				$data .= fread($fp, 1160);
				$info = stream_get_meta_data($fp);
			}
			if (!$info['timed_out']) {
				$success = true;
			} else {
				$error = 'fsocket timed out';
				$success = false;
			}
			fclose($fp);
		}

		if ($success) {
			return $data;
		} else {
			setMelding($error, -1);
			return '';
		}
	}

}
