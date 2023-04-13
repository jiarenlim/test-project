// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DurianTrackAndTrace {
    
    struct Durian {
        uint256 durianId;
        string farmInfo;
        uint256 harvestDate;
        string distributionInfo;
        uint256 distributionDate;
        string retailInfo;
        uint256 retailDate;
        uint8 tasteRating;
        uint8 fragranceRating;
        uint8 creaminessRating;
    }
    
    mapping(uint256 => Durian) private durians;
    
    event DurianHarvested(uint256 indexed durianId, string farmInfo, uint256 harvestDate);
    event DurianDistributed(uint256 indexed durianId, string distributionInfo, uint256 distributionDate);
    event DurianReceived(uint256 indexed durianId, string retailInfo, uint256 retailDate);
    event DurianRated(uint256 indexed durianId, uint8 tasteRating, uint8 fragranceRating, uint8 creaminessRating);
    
    function recordHarvest(uint256 _durianId, string memory _farmInfo, uint256 _harvestDate) public {
        Durian storage durian = durians[_durianId];
        durian.durianId = _durianId;
        durian.farmInfo = _farmInfo;
        durian.harvestDate = _harvestDate;
        
        emit DurianHarvested(_durianId, _farmInfo, _harvestDate);
    }
    
    function recordDistribution(uint256 _durianId, string memory _distributionInfo, uint256 _distributionDate) public {
        Durian storage durian = durians[_durianId];
        durian.distributionInfo = _distributionInfo;
        durian.distributionDate = _distributionDate;
        
        emit DurianDistributed(_durianId, _distributionInfo, _distributionDate);
    }
    
    function recordRetail(uint256 _durianId, string memory _retailInfo, uint256 _retailDate) public {
        Durian storage durian = durians[_durianId];
        durian.retailInfo = _retailInfo;
        durian.retailDate = _retailDate;
        
        emit DurianReceived(_durianId, _retailInfo, _retailDate);
    }
    
    function recordFeedback(uint256 _durianId, uint8 _tasteRating, uint8 _fragranceRating, uint8 _creaminessRating) public {
        Durian storage durian = durians[_durianId];
        durian.tasteRating = _tasteRating;
        durian.fragranceRating = _fragranceRating;
        durian.creaminessRating = _creaminessRating;
        
        emit DurianRated(_durianId, _tasteRating, _fragranceRating, _creaminessRating);
    }
    
    function getDurian(uint256 _durianId) public view returns (Durian memory) {
        return durians[_durianId];
    }
}
