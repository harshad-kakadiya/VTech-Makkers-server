import { EventEmitter } from 'events';

// Event Types
export interface LeadSubmittedV1Event {
  type: 'LeadSubmittedV1';
  timestamp: string;
  data: {
    leadId: number;
    name: string;
    email: string;
    company: string;
    phone?: string;
    project_location: string;
    message: string;
    matched_products: number[];
    query_text: string;
    product_name?: string;
    product_slug?: string;
  };
}

export interface NewLeadForDashboardEvent {
  type: 'NewLeadForDashboard';
  timestamp: string;
  data: {
    leadId: number;
    name: string;
    company: string;
    product_name?: string;
    created_at: string;
  };
}

export type BusinessEvent = LeadSubmittedV1Event | NewLeadForDashboardEvent;

// Event Bus Implementation
class EventBus extends EventEmitter {
  private static instance: EventBus;

  private constructor() {
    super();
    this.setMaxListeners(100); // Increase for production
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  async publish(event: BusinessEvent): Promise<void> {
    try {
      console.log(`Publishing event: ${event.type}`, {
        timestamp: event.timestamp,
        leadId: event.data.leadId
      });
      
      // Emit the event asynchronously
      this.emit(event.type, event);
      
      // In production, this would publish to AWS Kinesis or Google Pub/Sub
      // await this.publishToExternalBus(event);
    } catch (error) {
      console.error('Failed to publish event:', error);
      throw error;
    }
  }

  subscribe(eventType: string, handler: (event: BusinessEvent) => Promise<void>): void {
    this.on(eventType, async (event) => {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Event handler failed for ${eventType}:`, error);
        // In production, implement dead letter queue or retry logic
      }
    });
  }

  // Future: Integration with external event bus
  private async publishToExternalBus(event: BusinessEvent): Promise<void> {
    // AWS Kinesis implementation would go here
    // const params = {
    //   StreamName: 'industrial-leads-stream',
    //   Data: JSON.stringify(event),
    //   PartitionKey: event.data.leadId.toString()
    // };
    // await kinesis.putRecord(params).promise();
  }
}

export const eventBus = EventBus.getInstance();