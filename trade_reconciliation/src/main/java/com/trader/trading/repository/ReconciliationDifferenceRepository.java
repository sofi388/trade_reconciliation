package com.trader.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trader.trading.model.ReconciliationDifference;

public interface ReconciliationDifferenceRepository extends JpaRepository<ReconciliationDifference, Long> {
}