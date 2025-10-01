// Performance monitoring for sub-500ms video optimization
import { Request, Response } from 'express';

interface VideoMetrics {
  firstByteTime: number;
  firstFrameTime: number;
  segmentLoadTime: number;
  manifestLoadTime: number;
}

export class VideoPerformanceMonitor {
  private metrics: Map<string, VideoMetrics> = new Map();
  
  /**
   * Track first-byte time for critical video resources
   */
  trackFirstByte(req: Request, res: Response, next: Function) {
    const startTime = Date.now();
    
    // Only track hero video performance
    if (req.path.includes('Intro') && (req.path.includes('.mp4') || req.path.includes('.m3u8'))) {
      const originalSend = res.send;
      const originalEnd = res.end;
      
      res.send = function(body) {
        const firstByteTime = Date.now() - startTime;
        console.log(`[PERF] ${req.path} - First byte: ${firstByteTime}ms`);
        
        // Alert if over target
        if (firstByteTime > 250) {
          console.warn(`[PERF WARNING] ${req.path} exceeded 250ms target: ${firstByteTime}ms`);
        }
        
        return originalSend.call(this, body);
      };
      
      res.end = function(chunk?: any, encoding?: BufferEncoding) {
        const firstByteTime = Date.now() - startTime;
        console.log(`[PERF] ${req.path} - Response time: ${firstByteTime}ms`);
        
        return originalEnd.call(this, chunk, encoding);
      };
    }
    
    next();
  }
  
  /**
   * Validate video optimization requirements
   */
  validateOptimization(): boolean {
    // Check if critical files exist
    const criticalFiles = [
      'public/media/optimized/Intro-480p-000.mp4',
      'public/media/optimized/Intro-init.mp4',
      'public/media/optimized/Intro.m3u8',
      'public/media/optimized/Intro-480p.m3u8'
    ];
    
    const fs = require('fs');
    const allExist = criticalFiles.every((file: string) => fs.existsSync(file));
    
    if (!allExist) {
      console.error('[PERF] Missing critical video files for optimization');
      return false;
    }
    
    console.log('[PERF] Video optimization files validated ✓');
    return true;
  }
  
  /**
   * Generate performance report
   */
  getPerformanceReport(): object {
    return {
      timestamp: new Date().toISOString(),
      optimization_status: this.validateOptimization() ? 'ACTIVE' : 'INCOMPLETE',
      target_metrics: {
        first_byte_time: '< 250ms',
        first_frame_time: '< 250ms',
        total_startup: '< 500ms'
      },
      features_enabled: [
        'HLS Adaptive Streaming',
        'HTTP/2 Priority Headers',
        'Immutable Caching (31536000s)',
        'Byte-Range Requests',
        'Brotli Compression Hints',
        'CDN Preconnect',
        'Critical Resource Preloading'
      ]
    };
  }
}

export const performanceMonitor = new VideoPerformanceMonitor();

export default performanceMonitor;