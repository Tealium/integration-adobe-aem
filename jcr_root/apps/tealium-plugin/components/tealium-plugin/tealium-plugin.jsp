<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" %>

<jsp:useBean id="componentBean" scope="page" class="com.tealium.jsp.components.TealiumConfigurationComponentBean" />
<jsp:setProperty name="componentBean" property="request" value="<%=slingRequest%>" />
<jsp:setProperty name="componentBean" property="pageProperties" value="<%=pageProperties%>"/>

<c:if test="${componentBean.enabled}">
    <c:if test="${componentBean.enabledCustomUDO}">
        <div data-tealium-utag-data='${componentBean.utagData}' id="tealium-utag-data"></div>
    </c:if>
    <c:if test="${componentBean.enabledUtagSyncJs}">
        <div data-tealium-link-to-utag-js='${componentBean.linkToUtagJs}' id="tealium-link-to-utag-js"></div>
    </c:if>
    <cq:includeClientLib js="cq.tealium.plugin.js" />
</c:if>