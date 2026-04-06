package com.flightops.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String flightNumber;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDateTime scheduledDeparture;

    @Column(nullable = false)
    private LocalDateTime scheduledArrival;

    private LocalDateTime actualDeparture;
    private LocalDateTime actualArrival;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FlightStatus status;

    private String aircraftType;
    private Integer delayMinutes;
    private String delayReason;
    private String gate;

    public enum FlightStatus {
        SCHEDULED, BOARDING, DEPARTED, IN_FLIGHT, LANDED, ARRIVED, CANCELLED, DELAYED
    }
}
