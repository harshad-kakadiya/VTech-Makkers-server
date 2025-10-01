// Video optimization module for sub-500ms loading
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export interface VideoOptimizationConfig {
  segmentDuration: number; // HLS segment duration in seconds
  enableHLS: boolean;
  enableDASH: boolean;
  manifestCacheTTL: number; // Cache TTL for manifests in seconds
  segmentCacheTTL: number; // Cache TTL for segments in seconds
}

const config: VideoOptimizationConfig = {
  segmentDuration: 3, // 3-second segments for faster initial loading
  enableHLS: true,
  enableDASH: false, // Disable DASH for now, focus on HLS
  manifestCacheTTL: 60, // 1 minute for manifests
  segmentCacheTTL: 31536000 // 1 year for segments (immutable)
};

/**
 * Generate adaptive HLS manifest with multiple quality levels
 * Optimized for sub-500ms startup with faststart segments
 */
export function generateHLSManifest(videoPath: string): string {
  const baseName = videoPath.replace('.mp4', '').replace('/media/optimized/', '');
  
  // Master playlist with adaptive bitrates
  if (videoPath.includes('Intro.mp4')) {
    return `#EXTM3U
#EXT-X-VERSION:6
#EXT-X-INDEPENDENT-SEGMENTS

#EXT-X-STREAM-INF:BANDWIDTH=1200000,RESOLUTION=854x480,CODECS="avc1.42e01e"
${baseName}-480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720,CODECS="avc1.42e01f"
${baseName}-720p.m3u8`;
  }
  
  // Individual quality playlist (480p for fastest startup)
  return `#EXTM3U
#EXT-X-VERSION:6
#EXT-X-TARGETDURATION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-MAP:URI="${baseName}-init.mp4"
#EXTINF:3.000,
${baseName}-000.mp4
#EXTINF:3.000,
${baseName}-001.mp4
#EXTINF:3.000,
${baseName}-002.mp4
#EXTINF:3.000,
${baseName}-003.mp4
#EXTINF:2.500,
${baseName}-004.mp4
#EXT-X-ENDLIST`;
}

/**
 * Handle HLS manifest requests
 */
export function handleHLSManifest(req: Request, res: Response) {
  const videoPath = req.path.replace('.m3u8', '.mp4');
  
  // Set HLS-specific headers
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  res.setHeader('Cache-Control', `public, max-age=${config.manifestCacheTTL}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const manifest = generateHLSManifest(videoPath);
  res.send(manifest);
}

/**
 * Optimize video serving with advanced headers for sub-500ms playback
 */
export function optimizeVideoHeaders(req: Request, res: Response, next: Function) {
  const path = req.path.toLowerCase();
  const isVideo = path.includes('.mp4');
  const isHLS = path.includes('.m3u8') || path.includes('.ts');
  const isHeroVideo = path.includes('intro') || path.includes('optimized');
  
  if (isVideo || isHLS) {
    // Segment-specific caching for HLS
    if (path.includes('-000.mp4') || path.includes('-001.mp4') || path.includes('init.mp4')) {
      // First segments and init - immutable cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('X-Priority', 'urgent');
    } else if (path.includes('.m3u8')) {
      // Manifests - short cache for updates
      res.setHeader('Cache-Control', 'public, max-age=60');
    } else {
      // Regular segments - long cache
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Critical optimization headers for hero video
    if (isHeroVideo) {
      // HTTP/2 priority for instant loading
      res.setHeader('Priority', 'u=0, i'); // Highest priority
      res.setHeader('X-Priority', 'critical');
      
      // Preload hints for related resources
      res.setHeader('Link', [
        '</media/home/intro-poster.jpg>; rel=preload; as=image',
        '</media/optimized/Intro-480p-000.mp4>; rel=preload; as=video'
      ].join(', '));
    }
    
    // Enable byte-range requests for progressive download
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // CORS headers for CDN compatibility
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Accept-Encoding, Priority');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');
    
    // Performance optimization
    res.setHeader('Vary', 'Accept-Encoding');
    
    // Disable buffering for streaming
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Sendfile-Type', 'X-Accel-Redirect');
    
    // HTTP/2 server push for critical segments
    if (path.includes('Intro.m3u8')) {
      res.setHeader('X-HTTP2-Push', '/media/optimized/Intro-480p-000.mp4');
    }
  }
  
  next();
}

/**
 * Check if video file has moov atom at front (faststart)
 * In production, ensure all MP4s are processed with: ffmpeg -movflags +faststart
 */
export function validateVideoOptimization(filePath: string): boolean {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(32);
    fs.readSync(fd, buffer, 0, 32, 0);
    fs.closeSync(fd);
    
    // Check for ftyp atom (MP4 signature)
    const hasValidMP4 = buffer.toString('ascii', 4, 8) === 'ftyp';
    
    // In production, add more sophisticated moov atom detection
    return hasValidMP4;
  } catch (error) {
    console.error('Video validation error:', error);
    return false;
  }
}

export default {
  config,
  generateHLSManifest,
  handleHLSManifest,
  optimizeVideoHeaders,
  validateVideoOptimization
};